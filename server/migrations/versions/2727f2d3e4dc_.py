"""empty message

Revision ID: 2727f2d3e4dc
Revises: cd9787f97de3
Create Date: 2019-10-04 00:15:15.919300

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2727f2d3e4dc'
down_revision = 'cd9787f97de3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('houses',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('address', sa.String(), nullable=False),
    sa.Column('rent', sa.Float(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('type', sa.Integer(), nullable=False),
    sa.Column('pref_gender', sa.Integer(), nullable=True),
    sa.Column('bathrooms', sa.Integer(), nullable=True),
    sa.Column('bedrooms', sa.Integer(), nullable=True),
    sa.Column('poster_id', sa.Integer(), nullable=True),
    sa.Column('curr_roommates', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('houses')
    # ### end Alembic commands ###
